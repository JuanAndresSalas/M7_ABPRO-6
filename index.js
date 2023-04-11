import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv"

dotenv.config()


const sequelize = new Sequelize( process.env.DATABASE,
                                 process.env.DB_USER,
                                 process.env.DB_PASSWORD,
                                 {
                                    host:process.env.DB_HOST,
                                    dialect:'postgres'
                                        
                                 }
);

const cliente = sequelize.define('cliente', {
    id_cliente: {   type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
	nombre: {   type: DataTypes.STRING, 
                allowNull: false  
            },
    direccion: {  type: DataTypes.STRING, 
                  allowNull: false  
                }
   
 },
 {
    timestamps: false,
    createAt: false,
    updatedAt: false
 }
);

const producto = sequelize.define('producto', {
    id_producto: {  type: Sequelize.INTEGER,
                    primaryKey: true
                },
	nombre: {   type: DataTypes.STRING, 
                allowNull: false  
            }   
 },
 {
    timestamps: false,
    createAt: false,
    updatedAt: false
 }
);

const compra = sequelize.define('compra', {
    id_compra: {    type: Sequelize.INTEGER,
                    primaryKey: true
                },
	total: {   type: DataTypes.INTEGER, 
                allowNull: false  
            }   
 },
 {
    timestamps: false,
    createAt: false,
    updatedAt: false
 }
);

const detalle = sequelize.define('detalle', {
    comentario: {   type: Sequelize.STRING
                
                }  
 },
 {
    timestamps: false,
    createAt: false,
    updatedAt: false
 }
);

cliente.hasOne(compra)
detalle.hasOne(compra)
compra.belongsTo(cliente)
compra.belongsTo(detalle)
producto.hasMany(detalle)
detalle.belongsTo(producto)


await sequelize.sync({force: true})