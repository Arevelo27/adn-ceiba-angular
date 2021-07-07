pipeline {

    agent {
        label 'Slave_Induccion'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '3'))
        disableConcurrentBuilds()
    }

    tools {
        jdk 'JDK8_Centos'
        gradle 'Gradle4.5_Centos'
    }

    stages {
        stage('Checkout') {
            steps {
                echo '------------>Checkout<------------'
				checkout([
					$class: 'GitSCM', 
					branches: [[name: '*/master']], 
					doGenerateSubmoduleConfigurations: false, 
					extensions: [], 
					gitTool: 'Default', 
					submoduleCfg: [], 
					userRemoteConfigs: [[
						credentialsId: 'GITHub_arevelo27', 
						url:'https://github.com/Arevelo27/adn-ceiba-angular'
					]]
			    ])
            }
        }

        stage('NPM Install') {
            steps {
                withEnv(['NPM_CONFIG_LOGLEVEL=warn']) {
                    sh 'npm install'
                }
            }
        }

        stage('NPM Update') {
            steps{
              echo "------------>Testing<------------"
              sh 'npm install -g n n stable'
           }
        }

        stage('Test') {
           steps{
              echo "------------>Testing<------------"
              sh 'ng test --browsers ChromeHeadless --progress=false --watch false --code-coverage'
           }
        }

        stage('Lint') {
            steps {
                sh 'ng lint'
            }
        }

        stage('Static Code Analysis') {
            steps{
                echo '------------>Análisis de código estático<------------'
                withSonarQubeEnv('Sonar') {
                    sh "${tool name: 'SonarScanner', type:'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dproject.settings=sonar-project.properties"
                }
            }
        }

        stage('Build') {
            steps {
                sh 'ng build --prod --progress=false'
            }
        }
    }

    post {
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
            mail(to: 'andres.castillo@ceiba.com.co', subject: "Failed Pipeline:${currentBuild.fullDisplayName}", body: "Something is wrong with ${env.BUILD_URL}")
        }
    }
}
