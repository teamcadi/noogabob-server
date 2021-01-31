/**
 * @description api json 응답 함수
 *
 * @param {boolean} suc 응답 성공 여부
 * @param {string} mes suc 이 true 라면 data로 변환, 아니면 에러 메시지
 * @param {any} data 응답할 데이터
 * @success success랑 data를 보냄
 * @fail success랑 message를 보냄
 */
const getApi = (suc, mes, data) => {
  if (suc) {
    data = mes;
    return { success: suc, data };
  } else {
    return { success: suc, message: mes };
  }
};

export { getApi };
