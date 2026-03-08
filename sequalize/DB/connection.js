import { Sequelize } from 'sequelize';

// اسم الداتابيز - المستخدم - كلمة السر
export const sequelize = new Sequelize('testDatabase', 'root', 'root', {
  host: 'root',
  dialect: 'mysql',
});

export const syncTables = async () => {
  // اول ماالمشروع يبدا بعمل implementation ل model
  return await sequelize.sync(); // بتشتغل لو الtable مش معملوها create
};
