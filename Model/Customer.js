import Person from "./Person.js";
const ERROR_MESSAGE_CUSTOMER = {
    cus_empty: 'Tên công ty không được rỗng',
    bill_empty: 'Giá trị hoá đơn không được bỏ trống',
    bill_int: 'Giá trị hoá đơn phải là số nguyên',
    bill_range: 'Giá trị hoá đơn phải lớn hơn không'
}
let tbErrorTenCongTy = 'tbErrorTenCongTy'
let tbErrorHoaDon = 'tbErrorHoaDon'
class Customer extends Person {
    tenCongTy; triGiaHoaDon; danhGia;
    constructor(id, hoTen, diaChi, email, tenCongTy, triGiaHoaDon, danhGia) {
        super(id, hoTen, diaChi, email)
        this.tenCongTy = tenCongTy;
        this.triGiaHoaDon = triGiaHoaDon
        this.danhGia = danhGia
    }
    /**
     * validation 
     * @showAlert {boolean}  : xác định xem hiện thông báo trên thẻ html hay trên alert
     */
    checkTenCongTy(showAlert) {
        this.tenCongTy = this.tenCongTy.trim().split(/\s+/g).join(' ') // xoá mọi khoảng trắng thừa
        if (!this.tenCongTy) { // rỗng
            super.showError(tbErrorTenCongTy, ERROR_MESSAGE_CUSTOMER.cus_empty, showAlert)
            return false
        }
        return true
    }
    checkTriGiaHoaDon(showAlert) {
        this.triGiaHoaDon = this.triGiaHoaDon.replace(/\s/g, '')
        if (!this.triGiaHoaDon) { // rỗng
            super.showError(tbErrorHoaDon, ERROR_MESSAGE_CUSTOMER.bill_empty, showAlert)
            return false
        }
        let pa = /^[0-9]+$/
        if (!pa.test(this.triGiaHoaDon)) { // số ngày làm việc phải là số nguyên
            super.showError(tbErrorHoaDon, ERROR_MESSAGE_CUSTOMER.bill_int, showAlert)
            return false
        }
        this.triGiaHoaDon = +this.triGiaHoaDon
        if (this.soNgayLamViec <= 0) { // số ngày làm việc phải lớn hơn không
            super.showError(tbErrorHoaDon, ERROR_MESSAGE_CUSTOMER.bill_range, showAlert)
            return false
        }
        return true
    }
    /**
     * validation 
     * @showAlert {boolean}  : xác định xem hiện thông báo trên thẻ html hay trên alert
     * @list {array}: list để kiểm tra xem id đã tồn tại trong hệ thống hay chưa. tránh trùng lặp id
     */
    validationCustomer(list, showAlert = false) {
        let res = super.validationPerson(list, showAlert)
        res &= this.checkTenCongTy(showAlert)
        res &= this.checkTriGiaHoaDon(showAlert)
        return res
    }
}
export default Customer;