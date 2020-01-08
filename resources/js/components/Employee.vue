<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card">
            <div class="card-header">
            <h3 class="card-title">Employee List</h3>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
            <div id="example1_wrapper" class="dataTables_wrapper dt-bootstrap4">
                <div class="row">
                    <div class="col-sm-12 col-md-4">
                        <div class="dataTables_length" id="example1_length">
                            <label> 
                                <select name="example1_length" aria-controls="example1" class="custom-select custom-select-sm form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select> 
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-4">
                        <div id="example1_filter" class="dataTables_filter">
                            <label>
                                <input type="search" class="form-control form-control-sm" placeholder="Search" aria-controls="example1">
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-4">
                        <button class="btn btn-sm btn-success" @click="addEmployee">
                            <i class="fas fa-user-plus fa-fw"></i>Add Employee
                        </button>
                    </div>
                    </div>
                                    
                    <div class="row">
                        <div class="col-sm-12">
                            <table id="employee" class="table table-responsive-xl table-primary table-bordered table-striped dataTable" role="grid" aria-describedby="example1_info">
                
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Created</th>
                        <th>Modify</th>
                    </tr>
                <tr v-for="employee in employees" :key="employee.id">
                    <td>{{employee.id}}</td>
                    <td>{{employee.name}}</td>
                    <td>{{employee.mobile}}</td>
                    <td>{{employee.email}}</td>
                    <td>{{employee.address}}</td>
                    <td>{{employee.created_at | dateFormat}}</td>
                <td>
                    <a @click="editEmployee(employee)" class="blue">Edit
                        <i class="fa fa-edit blue"></i>
                    </a>
                    <a @click="deleteEmployee(employee.id)" class="red">Delete
                        <i class="fa fa-trash red"></i>
                    </a>
                </td>
                </tr>
                </tbody>
            </table>
            </div>
            </div>
            <!-- <div class="row">
                <div class="col-sm-12 col-md-5">
                    <div class="dataTables_info" id="example1_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div>
                    </div>
                    <div class="col-sm-12 col-md-7">
                        <div class="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                            <ul class="pagination">
                                <li class="paginate_button page-item previous disabled" id="example1_previous">
                                    <a href="#" aria-controls="example1" data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
                                    </li>
                                    <li class="paginate_button page-item active">
                                        <a href="#" aria-controls="example1" data-dt-idx="1" tabindex="0" class="page-link">1</a>
                                        </li>
                                        <li class="paginate_button page-item ">
                                            <a href="#" aria-controls="example1" data-dt-idx="2" tabindex="0" class="page-link">2</a>
                                            </li>
                                            <li class="paginate_button page-item ">
                                                <a href="#" aria-controls="example1" data-dt-idx="3" tabindex="0" class="page-link">3</a>
                                                </li>
                                                <li class="paginate_button page-item "><a href="#" aria-controls="example1" data-dt-idx="4" tabindex="0" class="page-link">4</a>
                                                </li>
                                                <li class="paginate_button page-item "><a href="#" aria-controls="example1" data-dt-idx="5" tabindex="0" class="page-link">5</a>
                                                </li>
                                                <li class="paginate_button page-item "><a href="#" aria-controls="example1" data-dt-idx="6" tabindex="0" class="page-link">6</a>
                                                </li>
                                                <li class="paginate_button page-item next" id="example1_next"><a href="#" aria-controls="example1" data-dt-idx="7" tabindex="0" class="page-link">Next</a>
                                                </li>
                                                </ul>
                                                </div>
                                                </div>
                                                </div> -->
            </div>
            </div>
            <!-- /.card-body -->
        </div>        

            </div>
        </div>
        <div class="modal fade" id="employeemodal" tabindex="-1" role="dialog" aria-labelledby="employeemodalLabel" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
    <div class="modal-header">
        <h5 v-show="!edit_mode" class="modal-title red" id="employeemodalLabel">Employee Registration</h5>
        <h5 v-show="edit_mode" class="modal-title blue" id="employeemodalLabel">Update Employee Information</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <form @submit.prevent="edit_mode ? updateEmployeeInfo(): createEmployee()">
    <div class="modal-body">
        
        <div class="form-group">
        <input v-model="form.name" type="text" name="name" placeholder="Name"
            class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
        <has-error :form="form" field="name"></has-error>
        </div>
    
        <div class="form-group">
        <input v-model="form.email" type="email" name="email" placeholder="Email"
            class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
        <has-error :form="form" field="email"></has-error>
        </div>
        <div class="form-group">
        <input v-model="form.mobile" type="mobile" name="mobile" placeholder="Mobile No"
            class="form-control" :class="{ 'is-invalid': form.errors.has('mobile') }">
        <has-error :form="form" field="mobile"></has-error>
        </div>
        <div class="form-group">
        <input v-model="form.address" type="address" name="Address" placeholder="address"
            class="form-control" :class="{ 'is-invalid': form.errors.has('address') }">
        <has-error :form="form" field="address"></has-error>
        </div>
    
    
    </div>
    <div class="modal-footer">
        <div class="col-sm-12 col-md-5">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
        <div class="col-sm-12 col-md-5">
            <button v-show="!edit_mode" type="submit" class="btn btn-success">Register</button>
            <button v-show="edit_mode" type="submit" class="btn btn-primary">Update</button>
        </div>
    </div>
    </form>
    </div>
</div>
</div>
    </div>
</template>
<script>
    export default {
        data()
        {
            return{
                edit_mode: false,
                employees:{},
                form: new Form({
                    id:'',
                    name:'',
                    address:'',
                    mobile:'',
                    email:''
                })
            }
        },
        methods:{
            updateEmployeeInfo()
            {
                this.$Progress.start();
                this.form.put('api/employee/'+this.form.id)
                .then(()=>{
                    $('#employeemodal').modal('hide');
                    Swal.fire(
                        'Updated!',
                        'Your Employee Record has been updated.',
                        'success'
                        )
                        Fire.$emit("EmployeeCreated");
                        this.$Progress.finish();
                })
                .catch(()=>{
                    this.$Progress.fail();
                });
            },
            addEmployee()
            {
                this.edit_mode = false;
                this.form.reset();
                $('#employeemodal').modal('show');
            },
            editEmployee(employee)
            {
                this.edit_mode = true;
                this.form.reset();
                $('#employeemodal').modal('show');
                this.form.fill(employee);
            },
            loadEmployee(){
                axios.get('api/employee').then(( { data } ) => (this.employees = data.data));
            },
            
            deleteEmployee(id){
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.value) {
                            this.form.delete('api/employee/'+id).then(()=>{
                                Swal.fire(
                                'Deleted!',
                                'Your Employee Record has been deleted.',
                                'success'
                                )
                                Fire.$emit("EmployeeCreated");
                            })
                            .catch(()=>{
                                Swal.fire("Failed!", "Somnething Went Wrong. Please Check","warning")
                            })
                        }
                    })
            },

            createEmployee()
            {
                this.$Progress.start();
                this.form.post('api/employee')
                .then(() =>{

                    Fire.$emit('EmployeeCreated');
                    $('#employeemodal').modal('hide');
    
                    Toast.fire({
                        icon: 'success',
                        title: 'Employee Created Successfully'
                    })
                    this.$Progress.finish();
                })
                .catch();
            }
        },
        created() {
            this.loadEmployee();
            Fire.$on('EmployeeCreated',() =>
            {
                this.loadEmployee();
            });
        },
        
    }
</script>
// Personal access client created successfully.
// Client ID: 1
// Client secret: lo7OtQKE1YnsMTXRxc5yMgzNhIpgIv00URTpJZIW
// Password grant client created successfully.
// Client ID: 2
// Client secret: z1nqQ0z9TjO1mmtVxyXqKbnjXu1HdDby2h6rLSrJ