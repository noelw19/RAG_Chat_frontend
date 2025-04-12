npm run build 

scp -r -i ~/.ssh/id_rsa ./dist root@170.64.152.229:~
ssh -i ~/.ssh/id_rsa root@170.64.152.229 'bash -s < /deploy_rag_frontend.sh'