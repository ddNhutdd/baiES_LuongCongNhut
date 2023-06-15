import Student from "./Student.js";
import Customer from "./Customer.js";
import Employee from "./Employee.js";
class ListPerson {
    listPerson;
    constructor(listPerson) {
        this.listPerson = [];
    }
    themPerson(newPerson) {
        this.listPerson.push(newPerson)
    }
    /**
     * xoá phần tử trong mảng person
     * @id {number}: id của phần tử cần được xoá
     * @return {boolean} trả về true nếu xoá thành công, nếu không tìm thấy hoặc có lỗi thì trả về false
     */
    xoaPerson(id) {
        if (this.listPerson.length > 0) {
            let index = this.listPerson.findIndex(n => n.id === id)
            if (index > -1) {
                this.listPerson.splice(index, 1);
                return true;
            }
            return false
        }
        return false
    }
    /**
     * cập nhập phần tử
     * @newPerson {person}: hàm dựa vào id của newPerson để tìm phần tử và cập nhật phần tử trong mảng
     * @return {boolean} hàm trả về true nếu cập nhật được thành công, ngược lại thì trả về false
     */
    capNhatPerson(newPerson) {
        if (this.listPerson.length > 0) {
            let index = this.listPerson.findIndex(n => n.id === newPerson.id)
            if (index > -1) {
                this.listPerson[index] = newPerson;
                return true;
            }
            return false
        }
        return false
    }
    /**
     * tìm phần tử trong mảng dựa vào id
     * @id {string}: id để tìm kiếm phần tử
     * @return {...} trả về phần tử được tìm thấy, nếu không tìm thấy thì trả về -1
     */
    timPersonTheoId(id) {
        if (this.listPerson.length > 0) {
            let index = this.listPerson.findIndex(n => n.id === id)
            if (index > -1) {
                return this.listPerson[index]
            }
            return -1
        }
        return -1
    }
    /**
     * sắp xếp mảng theo tên
     */
    sapXepTheoTen() {
        if (this.listPerson.length > 0) {
            this.listPerson = this.listPerson.sort((nextItem, item) => {
                let tenPersonTiepTheo = nextItem.hoTen.toLowerCase();
                let tenPersonHienTai = item.hoTen.toLocaleLowerCase();
                if (tenPersonTiepTheo > tenPersonHienTai) {
                    return 1;// giu nguyen
                }
                if (tenPersonTiepTheo < tenPersonHienTai) {
                    return -1;// dao vi tri
                }
                return 1;
            });
        }
    }
    /**
     * filter theo loai person
     * @condition {string} : loại person có thể là student, employee....
     * @return {[]} mảng chứa các phần tử đã được lọc
     */
    filterByPerson(condition) {
        const type = {
            Student: 'Student',
            Employee: 'Employee',
            Customer: 'Customer',
            All: 'All'
        }
        if (this.listPerson.length > 0) {
            let result = []
            switch (condition) {
                case type.Student:
                    result = this.listPerson.filter(n => n instanceof Student)
                    return result
                case type.Employee:
                    result = this.listPerson.filter(n => n instanceof Employee)
                    return result
                case type.Customer:
                    result = this.listPerson.filter(n => n instanceof Customer)
                    return result
                case type.All:
                    result = this.listPerson
                    return result
                default:
                    break;
            }
        }
    }
}
export default ListPerson;