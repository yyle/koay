module.exports = {
    session: {
        key: "SESSION_ID",
        maxAge: 86400000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        sessionTimeOutTime: 14400000
    },
    rule: {
        defaultPassword: 123456,
        salt: '87a186d2694f0769c7af5971a9499fcbaabfa58c2cef9cabbf6b22e8542b3745',
    },
    serverUserName: "ubuntu",
    path: {
        logPath: "/data/log/error.log",
        errorPath: "home/error/error",
        pathList: {
            root: "/data",
            patientRcd: "/data/patientRcd/",
            image: "/data/image",
            log: "/data/log",
            backup: "/data/backup",
            secure: "/data/secure",
            download: "/data/download",
            photoFilePath: "/data/photofile"
        },
    },
    parameters: {
        locale: "en",
        conf1: {
            allowedImageType: ["image/jpeg", "image/png", "image/svg+xml", "image/tiff", "image/bmp"],
            isAutoSave: true,
            autoSaveTimeFrequency: 3000,
            patientRcdLockTime: 1440000,
            autoDelPatientRcdLock: 40000
        },
        mailer_transport: "smtp",
        mailer_host: "127.0.0.1",
        mailer_user: null,
        mailer_password: null,
        secret: "ThisTokenIsNotSoSecretChangeIt",
        wsIp: "192.168.0.10",
        devServerPort: 8081
    }
}