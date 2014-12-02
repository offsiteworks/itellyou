cd %~dp0
cd ..
heroku logs --tail | node -e process.stdin.pipe(process.stdout);
pause
