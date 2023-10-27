import bcrypt from 'bcrypt';
const saltRounds = 10;

const generateHash = async (text) => {

    // try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = bcrypt.hash(text, salt);
        return hash
    // } catch (err) {
    //     console.log(err)
    //     throw new Error("Error in generating salt")
    // }
}


const comparePassword = async (password, savedHash) => {

    try {

        const result = await bcrypt.compare(password, savedHash);
        if(result == false) {
            throw new Error("Password does not match")
        }

    } catch (err) {
        throw err
    }   
}

export default {
    generateHash,
    comparePassword
}
