pipeline {
    agent any
     
    stages {
        stage('Clone Repository'){
            steps{
                git branch: 'main',
                    url: 'https://github.com/Jsuresh47/nodejs.git'
            }
        }
        
        stage("Build") {
            steps{
                nodejs(nodeJSInstallationName: 'nodejs18.7.1') 
                    sh '/usr/bin/npm install'
            }
        }

    }
}


// stage("Build")
//  {
//  nodejs(nodeJSInstallationName: 'nodejs15.2.1') {
//         sh 'npm install'
//     }
//  }  
