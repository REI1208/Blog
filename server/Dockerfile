FROM node:16-alpine 

ENV port=8080

# 设置工作目录  
WORKDIR /app  

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev


 
# 复制package.json和package-lock.json文件  
COPY package*.json ./  
  
# 复制项目源代码  
COPY . /app/
  
# 暴露端口  
EXPOSE 8080 

# 启动应用  
CMD ["node","app.js"]  