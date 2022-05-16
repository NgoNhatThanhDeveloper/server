export const mLogin = (req, res, next) => {
    if (req.body.account && req.body.password) {
        req.body.account = req.body.account.replace(
            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
            ""
        );
        req.body.password = req.body.password.replace(
            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
            ""
        );
        next();
    } else {
        return res.json({ success: false, result: "Dữ liệu gửi lên còn thiếu" });
    }
};
export const mChange = (req, res, next) => {
    if (req.body.password && req.body.password_replace) {
        req.body.password = req.body.password.replace(
            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
            ""
        );
        req.body.password_replace = req.body.password_replace.replace(
            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
            ""
        );
        next();
    } else {
        return res.json({ success: false, result: "Dữ liệu gửi lên còn thiếu" });
    }
};
export const mMissing = (req, res, next) => {
    if (req.body.account && req.body.email) {
        req.body.account = req.body.account.replace(
            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
            ""
        );
        req.body.email = req.body.email.replace(
            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
            ""
        );
        next();
    } else {
        return res.json({ success: false, result: "Dữ liệu gửi lên còn thiếu" });
    }
};
export const mConfirm = (req, res, next) => {
    if (req.body.account && req.body.value) {
        req.body.account = req.body.account.replace(
            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
            ""
        );
        next();
    } else {
        return res.json({ success: false, result: "Dữ liệu gửi lên còn thiếu" });
    }
};
export const mToken = (req, res, next) => {
    if (req.headers.access_token && req.headers.refresh_token) {
        next();
    } else {
        return res.json({ success: false, result: "Dữ liệu gửi lên còn thiếu" });
    }
};