# fitness-challenge-tracker

### DEPLPOYMENT ### 

# git checkout -b deploy
# webpack -p (webpack will run in "production mode")
  ## if error "command not found" returned, $export PATH="$(npm bin):$PATH"
# git add -f public/bundle.js public/bundle.js.map (add bundle.js files)
# git commit --allow-empty -m 'Deploying' 
# git push --force heroku deploy:main 
# git checkout main
# git branch -D deploy
