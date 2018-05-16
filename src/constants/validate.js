// 正则对象
export const REGEXP_IP = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
export const REGEXP_PORT = /^[1-9]*[1-9][0-9]*$/
export const REGEXP_NUMBER = /^\d+$/
export const REGEXP_INTEGER = /^-?\d+$/
export const REGEXP_EMAIL = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
export const REGEXP_MOBILE = /^1[345678]\d{9}$/
export const REGEXP_NAME_ENGLISH = /^[a-zA-Z][a-zA-Z0-9_]*$/