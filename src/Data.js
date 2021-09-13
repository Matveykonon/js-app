export class Data { 

    static async getItemsFromApi() {
        try {
             const response = await fetch('http://212.98.184.15:8080/users')
             const data = await response.json()
             return data
         } catch (e) {
            return console.log(e)
         }
    }

    static async getItemById(id) {
        try {
            const response = await fetch('http://212.98.184.15:8080/users')
            const data = await response.json()
                .then(data => data.filter(item => item.id === id))
            return data
        } catch (e) {
            console.log(e);
        }
    }

    static async createNewItem(item) {
        try {
            const response = await fetch('http://212.98.184.15:8080/create', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(item)
            })
            const data = await response.json()
            return data
        } catch (e) {
            console.log(e)
        }
    }

    static async deleteItem(id) {
        try {
            const response = await fetch(`http://212.98.184.15:8080/delete/${id}`, {
                method: 'DELETE',
            })
            const data = await response.json()
            return data
        } catch (e) {
            console.log(e);
        }
    }

    static async updateItem(id, item) {
        try {
            const response = await fetch(`http://212.98.184.15:8080/edit/${id}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(item)
            })
            const data = await response.json()
            return data
        } catch (e) {
            console.log(e)
        }
    }
}