import { hashSync, compareSync } from 'bcrypt'

export const hash = async (value: string): Promise<String> => {
    const salt:number = 12
    const hashedValue = await hashSync(value,salt)
    console.log(hashedValue)
    return hashedValue
}

export const compare = async (value: string, hashedValue: string) => {
    let isEqual = await compareSync(value, hashedValue)
    return isEqual
}