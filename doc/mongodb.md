#mongodb具体文档

## 目录结构

```text
|--mongodb
|	|__data(数据目录)
|	|__log(日志目录)
|	|	|__mongodb.log(日志文件)
|	|__mongodb.conf(数据库启动配置文件)
```

## 配置文件

```
dbpath = 数据存储文件夹地址(data)

#守护进程
fork = true

#用户认证(用户名密码登录)
auth = true

#端口号
port = 27017

logpath = /Users/qkong/Projects/mongodb/log/mongodb.log
logappend = true

# Only accept local connections
bind_ip = 127.0.0.1
```

## 权限管理

快递数据库添加用户名和密码

```
>use express;
>db.createUser({
{ user: "用户名",
  pwd: "密码",
  roles: [
    { role: "权限", db: "express" },
  ]
}
})
```

## 启动数据库

```
mongod -f mongodb.conf
```



