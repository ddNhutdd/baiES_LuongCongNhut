import Customer from "./Model/Customer.js";
import Employee from "./Model/Employee.js";
import ListPerson from "./Model/ListPerson.js";
import Student from "./Model/Student.js";
/* variable
-------------------------------------------------- */
const LOAI_CA_NHAN = {
    Student: 'Student',
    Employee: 'Employee',
    Customer: 'Customer',
    All: 'All'
}
const lstPerson = new ListPerson();
/* function
-------------------------------------------------- */
/**
 * hàm sẽ gắn sự kiện click cho dropdown loại person
 */
const themFunctionVaoLoaiCaNhanSeThem = () => {
    let dropdown = document.querySelector('#caNhanDuocChon button');
    let dropdownItems = document.querySelectorAll('#caNhanDuocChon a.dropdown-item');
    for (const item of dropdownItems) {
        item.addEventListener('click', () => {
            let text = item.innerHTML
            dropdown.innerHTML = text;
            disableControl(text);
        })
    }
}
/**
 * tuỳ theo loại cá nhân được chọn mà disable những input không cần thiết
 */
const disableControl = (key) => {
    switch (key) {
        case LOAI_CA_NHAN.Student:
            document.getElementById('inputToan').disabled = false
            document.getElementById('inputLy').disabled = false
            document.getElementById('inputHoa').disabled = false
            document.getElementById('inputSoNgayLamViec').disabled = true
            document.getElementById('inputLuongTheoNgay').disabled = true
            document.getElementById('inputTenCongTy').disabled = true
            document.getElementById('inputGiaTriHoaDon').disabled = true
            document.getElementById('inputDanhGia').disabled = true
            break;
        case LOAI_CA_NHAN.Employee:
            document.getElementById('inputToan').disabled = true
            document.getElementById('inputLy').disabled = true
            document.getElementById('inputHoa').disabled = true
            document.getElementById('inputSoNgayLamViec').disabled = false
            document.getElementById('inputLuongTheoNgay').disabled = false
            document.getElementById('inputTenCongTy').disabled = true
            document.getElementById('inputGiaTriHoaDon').disabled = true
            document.getElementById('inputDanhGia').disabled = true
            break;
        case LOAI_CA_NHAN.Customer:
            document.getElementById('inputToan').disabled = true
            document.getElementById('inputLy').disabled = true
            document.getElementById('inputHoa').disabled = true
            document.getElementById('inputSoNgayLamViec').disabled = true
            document.getElementById('inputLuongTheoNgay').disabled = true
            document.getElementById('inputTenCongTy').disabled = false
            document.getElementById('inputGiaTriHoaDon').disabled = false
            document.getElementById('inputDanhGia').disabled = false
            break;
        default:
            break;
    }
}
/**
 * ẩn all thông báo lỗi (những thông báo lỗi ngay dưới input)
 */
const anTatCaThongBaoLoi = () => {
    let tb = [
        'tbErrorId',
        'tbErrorHoTen',
        'tbErrorDiaChi',
        'tbErrorEmail',
        'tbErrorToan',
        'tbErrorLy',
        'tbErrorHoa',
        'tbErrorNgay',
        'tbErrorLuong',
        'tbErrorTenCongTy',
        'tbErrorHoaDon',
    ]
    tb.forEach(item => {
        let ele = document.getElementById(item)
        ele.classList.add('invisible')
        ele.classList.remove('visible')
    });
}
/**
 * load dữ liệu lên trên table bao gồm thêm sự kiện cho nút update và nút delete
 */
const renderData = (lst = lstPerson.listPerson) => {
    let tableShowData = document.querySelector('tbody')
    let htmlRender = ''
    lst.forEach(n => {
        let typePerson = LOAI_CA_NHAN.Student;
        let dtb = undefined
        let tongLuong = undefined
        if (n instanceof Student) {
            typePerson = LOAI_CA_NHAN.Student;
            dtb = n.tinhDiemTrungBinh()
        }
        if (n instanceof Employee) {
            typePerson = LOAI_CA_NHAN.Employee
            tongLuong = n.tinhLuong()
        }
        if (n instanceof Customer) {
            typePerson = LOAI_CA_NHAN.Customer
        }
        else { }
        htmlRender += `
            <tr id='tr_${n.id}'>
                <th scope="row">${n.id}</th>
                <td class='tb_hoTen'>${n.hoTen}</td>
                <td class='tb_diaChi'>${n.diaChi}</td>
                <td class='tb_email'>${n.email}</td>
                <td class='tb_toan'>${n.toan === undefined ? "" : n.toan}</td>
                <td class='tb_ly'>${n.ly === undefined ? "" : n.ly}</td>
                <td class='tb_hoa'>${n.hoa === undefined ? "" : n.hoa}</td>
                <td class='tb_dtb'>${dtb === undefined ? "" : dtb}</td>
                <td class='tb_ngay'>${n.soNgayLamViec === undefined ? "" : n.soNgayLamViec}</td>
                <td class='tb_luong'>${n.luongTheoNgay === undefined ? "" : n.luongTheoNgay}</td>
                <td class='tb_tongLuong'>${tongLuong === undefined ? "" : tongLuong}</td>
                <td class='tb_tenCt'>${n.tenCongTy === undefined ? "" : n.tenCongTy}</td>
                <td class='tb_hoaDon'>${n.triGiaHoaDon === undefined ? "" : n.triGiaHoaDon}</td>
                <td class='tb_danhGia'>${n.danhGia === undefined ? "" : n.danhGia}</td>
                <td>
                    <button id='${n.id}_${typePerson}' type="button" class="btn btn-primary"><i
                            class="fa-solid fa-user-pen"></i></button>
                    <button id='edit_${n.id}_${typePerson}' type="button" class="btn btn-success d-none"><i
                            class="fa-solid fa-check"></i></button>
                    <button id='remove_${n.id}' type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `
    })
    tableShowData.innerHTML = htmlRender
    // render nút delete
    let tableRecord = document.querySelectorAll('tbody button.btn-danger')
    tableRecord.forEach(ele => {
        let id = +ele.id.split('_')[1];
        ele.addEventListener('click', () => {
            lstPerson.xoaPerson(id)
            renderData();
        })
    });
    // render phần update
    let tableUpdate = document.querySelectorAll('tbody button.btn-primary')
    tableUpdate.forEach(ele => {
        ele.addEventListener('click', () => {
            let id = ele.id.split('_');
            let typePerson = id[1]
            id = +id[0]
            let el = document.querySelector(`table #tr_${id} td.tb_hoTen`)
            let va = el.innerHTML
            el.innerHTML = `<input class='tb_input_hoten' value='${va}' />`
            el = document.querySelector(`table #tr_${id} td.tb_diaChi`)
            va = el.innerHTML
            el.innerHTML = `<input class='tb_input_diaChi' value='${va}' />`
            el = document.querySelector(`table #tr_${id} td.tb_email`)
            va = el.innerHTML
            el.innerHTML = `<input class='tb_input_email' type='email' value='${va}' />`
            ele.classList.add('d-none')
            ele.classList.remove('d-block')
            let editButton = document.getElementById('edit_' + id + '_' + typePerson)
            editButton.classList.add('d-block')
            editButton.classList.remove('d-none')
            switch (typePerson) {
                case LOAI_CA_NHAN.Student:
                    el = document.querySelector(`table #tr_${id} td.tb_toan`)
                    va = el.innerHTML
                    el.innerHTML = `<input class='tb_input_toan' style='width:50px' value='${va}' />`
                    el = document.querySelector(`table #tr_${id} td.tb_ly`)
                    va = el.innerHTML
                    el.innerHTML = `<input class='tb_input_ly' style='width:50px' value='${va}' />`
                    el = document.querySelector(`table #tr_${id} td.tb_hoa`)
                    va = el.innerHTML
                    el.innerHTML = `<input class='tb_input_hoa' style='width:50px' value='${va}' />`
                    editButton.addEventListener('click', () => {
                        let ht = document.querySelector(`table #tr_${id} .tb_input_hoten`).value
                        let dc = document.querySelector(`table #tr_${id} .tb_input_diaChi`).value
                        let em = document.querySelector(`table #tr_${id} .tb_input_email`).value
                        let dt = document.querySelector(`table #tr_${id} .tb_input_toan`).value
                        let dl = document.querySelector(`table #tr_${id} .tb_input_ly`).value
                        let dh = document.querySelector(`table #tr_${id} .tb_input_hoa`).value
                        let updateStudent = new Student(id, ht, dc, em, dt, dl, dh);
                        updateStudent._showElert = true;
                        let valid = updateStudent.validationStudent(lstPerson.listPerson, true)
                        if (valid) {
                            let re = lstPerson.capNhatPerson(updateStudent)
                            if (re) {
                                renderData();
                            }
                        }
                    })
                    break;
                case LOAI_CA_NHAN.Employee:
                    el = document.querySelector(`table #tr_${id} td.tb_ngay`)
                    va = el.innerHTML
                    el.innerHTML = `<input class='tb_input_ngay' style='width:100px' value='${va}' />`
                    el = document.querySelector(`table #tr_${id} td.tb_luong`)
                    va = el.innerHTML
                    el.innerHTML = `<input class='tb_input_luong' style='width:100px' value='${va}' />`
                    editButton.addEventListener('click', () => {
                        let ht = document.querySelector(`table #tr_${id} .tb_input_hoten`).value
                        let dc = document.querySelector(`table #tr_${id} .tb_input_diaChi`).value
                        let em = document.querySelector(`table #tr_${id} .tb_input_email`).value
                        let ngay = document.querySelector(`table #tr_${id} .tb_input_ngay`).value
                        let luong = document.querySelector(`table #tr_${id} .tb_input_luong`).value
                        let updateEm = new Employee(id, ht, dc, em, ngay, luong)
                        updateEm._showElert = true
                        let valid = updateEm.validationEmployee(lstPerson.listPerson, true)
                        if (valid) {
                            let re = lstPerson.capNhatPerson(updateEm)
                            if (re) {
                                renderData()
                            }
                        }
                    })
                    break;
                case LOAI_CA_NHAN.Customer:
                    el = document.querySelector(`table #tr_${id} td.tb_tenCt`)
                    va = el.innerHTML
                    el.innerHTML = `<input class='tb_input_tenCt' value='${va}' />`
                    el = document.querySelector(`table #tr_${id} td.tb_hoaDon`)
                    va = el.innerHTML
                    el.innerHTML = `<input class='tb_input_hoaDon' value='${va}' />`
                    el = document.querySelector(`table #tr_${id} td.tb_danhGia`)
                    va = el.innerHTML
                    el.innerHTML = `<input class='tb_input_danhGia' value='${va}' />`
                    editButton.addEventListener('click', () => {
                        let ht = document.querySelector(`table #tr_${id} .tb_input_hoten`).value
                        let dc = document.querySelector(`table #tr_${id} .tb_input_diaChi`).value
                        let em = document.querySelector(`table #tr_${id} .tb_input_email`).value
                        let tenCongTy = document.querySelector(`table #tr_${id} .tb_input_tenCt`).value
                        let hoaDon = document.querySelector(`table #tr_${id} .tb_input_hoaDon`).value
                        let danhGia = document.querySelector(`table #tr_${id} .tb_input_danhGia`).value
                        let updateCus = new Customer(id, ht, dc, em, tenCongTy, hoaDon, danhGia)
                        let valid = updateCus.validationCustomer(lstPerson.listPerson, true)
                        if (valid) {
                            let re = lstPerson.capNhatPerson(updateCus)
                            if (re) {
                                renderData()
                            }
                        }
                    })
                    break;
                default:
                    break;
            }
        })
    })
}
/**
 * thêm sự kiện cho dropdown lọc dữ liệu
 */
const addFunctionForFilter = () => {
    let arrDropdownItem = document.querySelectorAll('#dropdownFilter .dropdown-item')
    arrDropdownItem.forEach(n => {
        n.addEventListener('click', () => {
            let dop = document.querySelector('#dropdownFilter button')
            let te = n.innerHTML
            dop.innerHTML = te
        })
    })
}
/* event
-------------------------------------------------- */
/**
 * sự kiện click khi người dùng nhấn vào nút thêm
 */
document.getElementById('btnThem').addEventListener('click', () => {
    anTatCaThongBaoLoi();
    let id = document.getElementById('inputId').value
    let hoTen = document.getElementById('inputHoTen').value
    let diaChi = document.getElementById('inputDiaChi').value
    let email = document.getElementById('inputEmail').value
    let type = document.querySelector('#caNhanDuocChon button')
    switch (type.innerHTML.replace(/\s/g, '')) {
        case LOAI_CA_NHAN.Student:
            let toan = document.getElementById('inputToan').value
            let ly = document.getElementById('inputLy').value
            let hoa = document.getElementById('inputHoa').value
            let st = new Student(id, hoTen, diaChi, email, toan, ly, hoa);
            let valid = st.validationStudent(lstPerson.listPerson)
            if (valid) {
                lstPerson.themPerson(st)
                renderData();
            }
            break;
        case LOAI_CA_NHAN.Employee:
            let soNgayLamViec = document.getElementById('inputSoNgayLamViec').value
            let luongTheoNgay = document.getElementById('inputLuongTheoNgay').value
            let em = new Employee(id, hoTen, diaChi, email, soNgayLamViec, luongTheoNgay)
            let validEm = em.validationEmployee(lstPerson.listPerson)
            if (validEm) {
                lstPerson.themPerson(em)
                renderData();
            }
            break;
        case LOAI_CA_NHAN.Customer:
            let tenCongTy = document.getElementById('inputTenCongTy').value
            let giaTriHoaDon = document.getElementById('inputGiaTriHoaDon').value
            let danhGia = document.getElementById('inputDanhGia').value
            let cus = new Customer(id, hoTen, diaChi, email, tenCongTy, giaTriHoaDon, danhGia)
            let validCus = cus.validationCustomer(lstPerson.listPerson)
            if (validCus) {
                lstPerson.themPerson(cus)
                renderData();
            }
            break;
        default:
            break;
    }
})
document.getElementById('btnSortByName').addEventListener('click', () => {
    lstPerson.sapXepTheoTen()
    renderData()
})
document.getElementById('btnFilter').addEventListener('click', () => {
    let result = []
    let con = document.querySelector('#dropdownFilter button').innerHTML
    result = lstPerson.filterByPerson(con)
    renderData(result)
})
/* page load
-------------------------------------------------- */
themFunctionVaoLoaiCaNhanSeThem();
anTatCaThongBaoLoi();
disableControl(LOAI_CA_NHAN.Student);
addFunctionForFilter()