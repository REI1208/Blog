# 使用Nginx镜像来运行构建好的项目
FROM nginx:alpine

COPY /dist/ usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]

