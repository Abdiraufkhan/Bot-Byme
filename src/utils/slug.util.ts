import slugify from "slugify";

export const createSlug = (title: string): string => {
    const options = {
        remove: /[*+~.()'"!:@/\\|]/g,
        lower: true,
        trim: true,
        replacement: "-",
    };

    const slug = slugify(title, options);

    return slug;
};
