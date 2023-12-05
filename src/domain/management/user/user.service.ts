import UserRepo from "./user.repo";
import { LoginUserDto, RegisterUserDto } from "./user.dto";
import { ConflictError } from "errors/conflict.error";
import { ErrorMessage } from "enums/error-message.enum";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { IPayloadUser } from "interfaces/payloaduser.inreface";
import { NotFoundError } from "errors/not-found.error";
import { BadRequestError } from "errors/bad-request.error";

class UserService {
    public repo = new UserRepo();

    public async getAll() {
        return this.repo.getAll();
    }

    public async register(data: RegisterUserDto): Promise<object> {
        const { username, password } = data;

        let user = await this.repo.getByUsername(username);
        if (user) throw new ConflictError(ErrorMessage.UsernameAlreadyTaken);

        const hash = await this.generateHash(password);

        const { dataValues: newUser } = await this.repo.create({
            ...data,
            password: hash,
        });
        delete newUser.password;

        const payload: IPayloadUser = {
            ...newUser,
        };

        const access_token:string = this.generateJWT(payload)

        const admindata = newUser

        return { data: admindata,
        token: access_token};
    }


    public login =  async (data: LoginUserDto): Promise<string> => {
        const {username, password} = data;

        const user = await this.repo.getByUsername(username);

        if (!user) throw new NotFoundError(ErrorMessage.AdminNotFound);

        const isPaswordCorrect = await this.compareHash(
            password,
            user.password
        );

        if (!isPaswordCorrect)
        throw new BadRequestError(ErrorMessage.IncorrectPassword);

        const payload: IPayloadUser = {
            id: user.id.toString(),
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,

        };
        
        return this.generateToken(payload)
    }


    public generateToken = async (payload: IPayloadUser):Promise<string> =>{
        return sign(payload, process.env.ACCESS_TOKEN_SECRET);
    }

    private async generateHash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    private async compareHash(
        password: string,
        hash: string
    ): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    private generateJWT(payload: IPayloadUser): string {
        return sign(payload, process.env.ACCESS_TOKEN_SECRET);
    }

    private verifyJWT(token: string): boolean {
        try {
            verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            return false;
        }
    }
}

export default UserService;
