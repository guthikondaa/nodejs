pipeline {
    agent any
     
    stages {
        stage('Clone Repository'){
            steps{
                git branch: 'main',
                    url: 'https://github.com/guthikondaa/nodejs.git'
            }
        }
        
        stage('Install Dependencies'){
            steps {
                nodejs(nodeJSInstallationName: 'nodejs15.2.1') {
                sh 'npm install'
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
