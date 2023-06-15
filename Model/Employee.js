import Person from "./Person.js";
const ERROR_MESSAGE_EMPLOYEE = {
    soNgay_empty: 'Số ngày làm việc không được rỗng',
    soNgay_float: 'Số ngày làm việc phải là số thập phân',
    soNgay_range: 'Số ngày làm việc phải lớn hơn không',
    luong_empty: 'Lương theo ngày không được rỗng',
    luong_int: 'Lương theo ngày làm việc phải là số nguyên',
    luong_range: 'Lương theo ngày làm việc phải lớn hơn không'
}
let tbErrorNgay = 'tbErrorNgay'
let tbErrorLuong = 'tbErrorLuong'
class Employee extends Person {
    soNgayLamViec; luongTheoNgay;
    constructor(id, hoTen, diaChi, email, soNgayLamViec, luongTheoNgay) {
        super(id, hoTen, diaChi, email)
        this.soNgayLamViec = soNgayLamViec;
        this.luongTheoNgay = luongTheoNgay
    }
    tinhLuong() {
        return this.soNgayLamViec * this.luongTheoNgay
    }
    /**
     * validation : kiểm tra tính hợp lệ của dữ liệu
     * @showAlert {boolean}: xác định xem hiển thị thông báo lỗi lên phần tử html hay show alert
     */
    checkSoNgayLamViec(showAlert) {
        this.soNgayLamViec = this.soNgayLamViec.replace(/\s/g, ''); // xoá mọi khoảng trắng trong string
        if (!this.soNgayLamViec) { // rỗng
            super.showError(tbErrorNgay, ERROR_MESSAGE_EMPLOYEE.soNgay_empty, showAlert)
            return false
        }
        let pa = /^(\d{1,2}(\.\d{1,2})?)$/
        if (!pa.test(this.soNgayLamViec)) { // số ngày làm việc phải là số thập phân
            super.showError(tbErrorNgay, ERROR_MESSAGE_EMPLOYEE.soNgay_float, showAlert)
            return false
        }
        this.soNgayLamViec = +this.soNgayLamViec
        if (this.soNgayLamViec <= 0) { // số ngày làm việc phải lớn hơn không
            super.showError(tbErrorNgay, ERROR_MESSAGE_EMPLOYEE.soNgay_range, showAlert)
            return false
        }
        return true
    }
    checkLuongTheoNgay(showAlert) {
        this.luongTheoNgay = this.luongTheoNgay.replace(/\s/g, ''); // xoá mọi khoảng trắng trong string
        if (!this.luongTheoNgay) { //  rỗng
            super.showError(tbErrorLuong, ERROR_MESSAGE_EMPLOYEE.luong_empty, showAlert)
            return false
        }
        let pa = /^[0-9]+$/
        if (!pa.test(this.luongTheoNgay)) { // số ngày làm việc phải là số nguyên
            super.showError(tbErrorLuong, ERROR_MESSAGE_EMPLOYEE.luong_int, showAlert)
            return false
        }
        this.luongTheoNgay = +this.luongTheoNgay
        if (this.luongTheoNgay <= 0) { // số ngày làm việc phải lớn hơn không
            super.showError(tbErrorLuong, ERROR_MESSAGE_EMPLOYEE.luong_range, showAlert)
            return false
        }
        return true
    }
    /**
     * validation : kiểm tra tính hợp lệ của dữ liệu
     * @showAlert {boolean}: xác định xem hiển thị thông báo lỗi lên phần tử html hay show alert
     * @list {array}: danh sách để kiểm tra xem id đã tồn tại trên hệ thống hay chưa, tránh trùng lặp id
     */
    validationEmployee(list, showAlert = false) {
        let res = super.validationPerson(list, showAlert)
        res &= this.checkSoNgayLamViec(showAlert)
        res &= this.checkLuongTheoNgay(showAlert)
        return res
    }
}
export default Employee;