pipeline {
    agent any
    tools {
     nodejs "Nodejs"
     }
    stages {
        stage('Clone Repository'){
            steps{
                git branch: 'main',
                    url: 'https://github.com/guthikondaa/nodejs.git'
            }
        }
        
        stage('Install Dependencies'){
            steps {
                sh 'npm install'
                sh 'npm build'
                sh 'npm test'
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
