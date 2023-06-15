import Person from "./Person.js";
const ERROR_MESSAGE_STUDENT = {
    toan_empty: 'Điểm toán không được bỏ trống',
    toan_float: 'Điểm toán phải là số thập phân',
    toan_range: 'Điểm toán phải >0 và <10',
    ly_empty: 'Điểm lý không được bỏ trống',
    ly_float: 'Điểm lý phải là số thập phân',
    ly_range: 'Điểm lý phải >0 và <10',
    hoa_empty: 'Điểm hoá không được bỏ trống',
    hoa_float: 'Điểm hoá phải là số thập phân',
    hoa_range: 'Điểm hoá phải >0 và <10',
}
let tbErrorToan = 'tbErrorToan'
let tbErrorLy = 'tbErrorLy'
let tbErrorHoa = 'tbErrorHoa'
class Student extends Person {
    toan; ly; hoa;
    constructor(id, hoTen, diaChi, email, toan, ly, hoa) {
        super(id, hoTen, diaChi, email) // lớp kế thừa bắt buộc phải gọi hàm của lớp cha, sau đó mới được viết thêm vào
        this.toan = toan;
        this.ly = ly
        this.hoa = hoa
    }
    tinhDiemTrungBinh() {
        let re = (this.toan + this.ly + this.hoa) / 3
        return Math.round(re * 100) / 100
    }
    checkToan(showAlert) {
        this.toan = this.toan.replace(/\s/g, ''); // xoá mọi khoảng trắng trong string
        if (!this.toan) { // điểm rỗng
            super.showError(tbErrorToan, ERROR_MESSAGE_STUDENT.toan_empty, showAlert)
            return false
        }
        let pa = /^(\d{1,2}(\.\d{1,2})?)$/
        if (!pa.test(this.toan)) { // điểm không đúng địng dạng số thực
            super.showError(tbErrorToan, ERROR_MESSAGE_STUDENT.toan_float, showAlert)
            return false
        }
        this.toan = +this.toan
        if (this.toan < 0 || this.toan > 10) {
            super.showError(tbErrorToan, ERROR_MESSAGE_STUDENT.toan_range, showAlert)
            return false
        }
        return true;
    }
    checkLy(showAlert) {
        this.ly = this.ly.replace(/\s/g, ''); // xoá mọi khoảng trắng trong string
        if (!this.ly) { // điểm rỗng
            super.showError(tbErrorLy, ERROR_MESSAGE_STUDENT.ly_empty, showAlert)
            return false
        }
        let pa = /^(\d{1,2}(\.\d{1,2})?)$/
        if (!pa.test(this.ly)) { // điểm không đúng địng dạng số thực
            super.showError(tbErrorLy, ERROR_MESSAGE_STUDENT.ly_float, showAlert)
            return false
        }
        this.ly = +this.ly
        if (this.ly < 0 || this.ly > 10) {
            super.showError(tbErrorLy, ERROR_MESSAGE_STUDENT.ly_range, showAlert)
            return false
        }
        return true;
    }
    checkHoa(showAlert) {
        this.hoa = this.hoa.replace(/\s/g, ''); // xoá mọi khoảng trắng trong string
        if (!this.hoa) { // điểm rỗng
            super.showError(tbErrorHoa, ERROR_MESSAGE_STUDENT.hoa_empty, showAlert)
            return false
        }
        let pa = /^(\d{1,2}(\.\d{1,2})?)$/
        if (!pa.test(this.hoa)) { // điểm không đúng địng dạng số thực
            super.showError(tbErrorHoa, ERROR_MESSAGE_STUDENT.hoa_float, showAlert)
            return false
        }
        this.hoa = +this.hoa
        if (this.hoa < 0 || this.hoa > 10) {
            super.showError(tbErrorHoa, ERROR_MESSAGE_STUDENT.hoa_range, showAlert)
            return false
        }
        return true;
    }
    /**
     * kiểm tra tính hợp lệ của dữ liệu
     * @list {array}: kiểm tra xem có trùng id không, 
     * @showAlert {boolean}: xác định xem hiển thị thông báo lỗi lên phần tử html hay là lên alert
     */
    validationStudent(list, showAlert = false) {
        let res = super.validationPerson(list, showAlert)
        res &= this.checkToan(showAlert)
        res &= this.checkLy(showAlert)
        res &= this.checkHoa(showAlert)
        return res
    }
}
export default Student;
