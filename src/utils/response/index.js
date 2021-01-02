/**
 * @description api json 응답 함수
 * @param {suc, mes, data} api 응답 객체
 *
 * @success success랑 data를 보냄
 * @fail success랑 message를 보냄
 */
const getApi = ({ suc, mes = "msg", data = null }) => {
  if (suc) return { success: suc, data };
  else return { success: suc, message: mes };
};

export { getApi };
