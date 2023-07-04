import axios from "axios";

const API_ROUTE = 'http://localhost:4321';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

class ApiService {
    public static async login(email: string, password: string) {
        return axios({
            method: 'post',
            url: `${API_ROUTE}/login`,
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                email,
                password
            }
        });
    }

    public static async getAllRoomsByUserId(userId: string) {
        return axios({
            method: 'get',
            url: `${API_ROUTE}/rooms?userId=${userId}`
        });
    }

    public static async getAllMessageByRoomId(roomId: string) {
        return axios({
            method: 'get',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            url: `${API_ROUTE}/message?roomId=${roomId}`
        });
    }

    public static async getUSerByEmail(email: string) {
        return axios({
           method: 'get',
           headers: {
               'Authorization': `Bearer ${localStorage.getItem('token')}`,
               url: `${API_ROUTE}/user?email=${email}`
           }
        });
    }
}

export { ApiService };
