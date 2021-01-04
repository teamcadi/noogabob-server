import mysql2, { format } from "mysql2/promise";
import config from "../../configs";

const pool = mysql2.createPool({
  ...config.db,
  database: config.dbSchema,
  connectionLimit: 10,
  waitForConnections: true,
});

/**
 * @description DML query와 값을 받아서 sql 생성 후 실행하고 결과를 반환하는 함수
 * @param {string} query 쿼리
 * @param {list} values 매핑할 리스트
 */
export const executeQuery = (query, values = []) =>
  new Promise(async (resolve, reject) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const sql = format(query, values);
      // sql이 select 일 때 result 타입은 list 이므로 하나를 찾는 모델을 구현할 때 리스트에서 구조 분해 할당 후 사용할 것
      // ex) User.findById(id)
      const [result] = await conn.execute(sql);
      conn.release();
      resolve(result);
    } catch (e) {
      if (conn) conn.release();
      reject(e);
    }
  });

/**
 * @description 디비 트랜잭션
 * @param  {...any} args
 */
export const transaction = (...args) =>
  new Promise(async (resolve, reject) => {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.beginTransaction();
      args.forEach(async (element) => await element(conn));
      await conn.commit();
      conn.release();
      resolve();
    } catch (e) {
      if (conn) {
        await conn.rollback();
        conn.release();
        reject(e);
      }
    }
  });
