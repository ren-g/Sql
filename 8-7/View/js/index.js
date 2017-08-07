axios.get("/aa").
then(function (obj) {
    var json = PepalSign(obj.data);
    console.log(json);
});

function PepalSign(arr) {
    var Sex = {},
        NativePlace = {};
    arr.forEach(function (o) {
        newArr.push(IdCard(o));
    }, this);
    return newArr;
}

//根据身份证号获取性别以及地区
function IdCard(obj) {
    var isNull = function(obj){
        var o = (!obj || obj == "") ? "空" : obj;
        return o;
    }
    var IdCardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    var per = { Sex: "空", NativePlace: "空" };
    if (isNull(obj.Sex) == "空") {
        if (isNull(obj.IdCardNo) != "空" || IdCardReg.test(obj.IdCardNo)) {
            var str = "";
            if (obj.IdCardNo.length == 15) {
                str = obj.IdCardNo.substring(14, 1);
            } else if (obj.IdCardNo.length == 18) {
                str = obj.IdCardNo.substring(16, 1);
            }
            per.Sex = (str % 2 == 0) ? "女" : "男";
        }
    } else {
        per.Sex = (obj.Sex == 2) ? "女" : "男"
    }
    var place = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    };
    // plArr = ["北京","天津","河北","山西","内蒙古","辽宁","吉林","黑龙江","上海","江苏","浙江","安徽","福建","江西","山东","河南","湖北","湖南","广东","广西","海南","重庆","四川","贵州","云南","西藏","陕西","甘肃","青海","宁夏","新疆","台湾","香港","澳门","国外"];
    if (isNull(obj.NativePlace) != "空") {
        for (var i in place) {
            if (obj.NativePlace.indexOf(place[i]) > -1) {
                per.NativePlace = place[i];
            } else if (isNull(obj.IdCardNo) != "空" || IdCardReg.test(obj.IdCardNo)) {
                if (obj.IdCardNo.substring(0, 2) == i) {
                    per.NativePlace = place[i];
                }
            }
        }
    }
    return per;
}