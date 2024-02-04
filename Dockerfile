#指定基础镜像为最新版 nginx
FROM nginx:latest
#将项目下的 /configs 文件夹放置在镜像中的 /home/nginx/configs 文件夹中
ADD ./configs /home/nginx/configs
ADD ./dist /dist
#运行 nginx
CMD ["nginx","-c","/home/nginx/configs/nginx.conf","-g", "daemon off;"]
#镜像对外暴露端口
EXPOSE 9527
# FROM node:latest
# COPY package.json /
# RUN npm i --registry=https://registry.npm.taobao.org
# RUN npm run build
 
# FROM nginx:latest
# # 这里的dist/目录是你的项目打包后的文件目录
# COPY ./dist/ /usr/share/nginx/html/
# COPY ./nginx.conf /etc/nginx/conf.d/
 
# EXPOSE 80