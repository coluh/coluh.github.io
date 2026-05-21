
run dev:

```Shell
cd fe && bun run dev
cd server && go run cmd/server/main.go
```

build:

```Shell
cd fe && bun run build
cd server && go build cmd/server/main.go
```

deploy:

```Shell
cd fe && sudo cp -r dist/* /var/www/html/
cd server && ./main
```

todo:
- js game
- online game
- ai chat room
- message board