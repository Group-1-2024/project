/* eslint-disable implicit-arrow-linebreak */
import to from "await-to-js";
// eslint-disable-next-line import/no-cycle
import request from "./request";

export const getHomePageData = async () => {
  const [error, res] = await to(request.get("/homepage/block/page"));
  if (error) return console.log("请求出错！");
  return res.data.data.blocks;
};
export const getHomePageMenu = () => request.get("/homepage/dragon/ball");
export const loginByPhone = (data) => request.post("/login/cellphone", data);
export const sendValidCode = (data) => request.post("/captcha/sent", data);
// 获取MV排行榜 {参数名： 参数值}
export const getTopMv = (data) => request.post("/top/mv", data);
// 获取歌单所有歌曲
export const getPlaylistTrackAll = (data) =>
  request.post("/playlist/track/all", data);
// 获取歌单详情
export const getPlaylistDetail = (data) =>
  request.post("/playlist/detail", data);
// 相关歌单推荐
export const getRelatedPlaylist = (data) =>
  request.post("/related/playlist", data);
// 获取验证码的key值
export const codeKey = () => request.get("/login/qr/key");
// 获取二维码
export const code = (data) => request.get("/login/qr/create", { params: data });
// 获取验证码状态
export const codestatus = (data) =>
  request.get("/login/qr/check", { params: data });


export const checkValidCode = (data) => request.post("/captcha/verify", data);
export const getInformation = (params) =>
  request.get("/user/detail", { params });
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export const getUserSubcount = () => request.get("/user/subcount");
// 游客登录
export const getVisitorLogin = () => request.get("/register/anonimous");
// 邮箱登录
export const getEmailLogin = (data) => request.post("/login", data);
// 获取用户歌单
export const getUserPlaylist = (params) =>
  request.get("/user/playlist", { params });

