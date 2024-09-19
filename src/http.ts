import axios from 'axios';
import { Global } from './global';

const serverAddress = 'http://localhost:5000';

export const httpClient = axios.create({
    baseURL: serverAddress,
});

export async function registerSeminar(): Promise<number> {
    try {
        const response = await httpClient.post("/sem");
        console.log(`Номер семинара: ${response.data}`)
        Global.semNumber = response.data;
        return response.data;
    } catch (error) {
        console.error('Не получилось создать семинар. Попробуйте позже.')
        throw error;
    }
}

export async function updateStudentList(): Promise<Map<string, number>> {
    try {
        const response = await httpClient.get(`/sem/${Global.semNumber}`);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error('Не получилось получить данные о студентах с сервера')
        throw error;
    }
}

export async function seeTexts(name: string): Promise<Array<string>> {
    try {
        const response = await httpClient.get(`/sem/${Global.semNumber}/${name}`)
        return JSON.parse(response.data);
    } catch (error) {
        console.error('Не получилось получить тексты заданий')
        throw error;
    }
}