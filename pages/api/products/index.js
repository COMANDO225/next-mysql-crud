import { pool } from '../../../config/db'

export default async function handler(req, res){

    switch(req.method) {
        case 'GET':
            return await getProduct(req,res)

        case 'POST':
            return await saveProduct(req, res)
    }
}

const getProduct = async (req, res) => {
    try {
        const [resul] = await pool.query("SELECT * FROM product")
        return res.status(200).json(resul)
    } catch (error) {
        return res.status(500).json({error})
    }
}


const saveProduct = async (req, res) => {
    const {name, description, price} = req.body
    try {
        const [resul] = await pool.query('INSERT INTO product SET ?', {
            name,
            description,
            price
        })
        const id = resul.insertId
        return res.status(200).json(name, price, description, id)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}