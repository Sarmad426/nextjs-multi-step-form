export const User = {
    name: "",
    age: 0,
    email: "",
    gender: "",
    password: "",
};


export const setProgress = (step: string | null) => {
    if (!step) return 0;
    else if (step === "age") return 25;
    else if (step === "email") return 50;
    else if (step === "gender") return 75;
    return 100;
};