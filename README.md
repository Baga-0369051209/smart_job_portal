cat > README.md <<EOF
# Smart Job Portal

## Run backend
cd backend
npm install
# create .env with DB credentials
npm run dev   # or node src/server.js

## Run frontend
cd frontend
npm install
npm start

EOF

git add README.md
git commit -m "Add README"
git push
