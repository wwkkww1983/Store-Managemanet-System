<template>
  <div>
    <v-container>
        <v-row >
          
          <v-col :cols="12">
                <v-row><h4>Application User List</h4></v-row>

                <v-row>
                  <v-col :cols="12">
                      <v-simple-table fixed-header  height="330px">
                        <template v-slot:default>
                          <thead >
                            <tr >
                              <th class="text-left">#</th>
                              <th class="text-left">Designation</th>
                              <th class="text-left">Email</th>
                              <th class="text-left">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="ApplicationUser in Users" :key="ApplicationUser.id" >
                              <td>{{ApplicationUser.id}}</td>
                              <td>{{ApplicationUser.designation}}</td>
                              <td>{{ApplicationUser.email}}</td>
                              <td>
                                <v-icon color="green" @click.stop="dialog = true" @click="GetUser(ApplicationUser.id)">mdi-file-find</v-icon> |
                                <v-icon @click="DeleteUser(ApplicationUser.id)" color="error">mdi-delete-forever</v-icon> 
                               </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                  </v-col>
                </v-row>
            </v-col>  
        </v-row>
        

        <!-- ---------------------------------------------------- -->
        <v-dialog v-model="dialog"  max-width="590" >
          <v-card>
              <v-card-title class="headline"> 
                {{User.userName}}  # <v-btn color="primary" @click.stop="dialog2 = true" @click="GetUserRoles(User.id)" class="ml-12" tile >Edit Role</v-btn> 
              </v-card-title>
              <hr>
              <v-card-text class="py-4">
                  <v-form ref="form">
                      <v-text-field label="User Id" required disabled v-model="User.id" ></v-text-field>
                      <v-text-field  required label="User Name"  v-model="User.userName"></v-text-field>
                      <v-text-field  label="Email" required v-model="User.email"></v-text-field>
                      <v-text-field v-model="User.address"  label="Address"   type="text" /> 
                      <v-select class="mt-4"  :items="Designations" v-model="User.designation"  label="Designation" dense ></v-select>
                      <v-btn color="primary" class="mr-4"  > Edit ApplicationUser </v-btn>
                      <v-btn color="error" class="mr-2" @click.stop="dialog = !true">Cancle</v-btn>
                    </v-form>
              </v-card-text>
          </v-card>
        </v-dialog>
        <!-- ---------------------------------------------------- -->

        <!-- ---------------------------------------------------- -->
        <v-dialog v-model="dialog2"  max-width="590" >
          <v-card>
              <v-card-title class="headline"> 
                {{User.userName}}  #  
              </v-card-title>
              <hr>
              <v-card-text class="py-4">
                  <v-row><h4>Employee List</h4></v-row>
                  <v-row>
                    <v-col :cols="12">
                        <v-simple-table fixed-header >
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th v-for="UserRole in UserRoles" :key="UserRole.id" class="text-left">
                                  {{UserRole.role.name}}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td v-for="UserRole in UserRoles" :key="UserRole.id" >
                                   <v-checkbox v-model="UserRole.roleIsAssign"></v-checkbox>
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                    </v-col>
                  </v-row>
                  
                  <v-btn color="primary" class="mr-4" @click="UpdateUserRoles()" > Update Role </v-btn>
                  <v-btn color="error" class="mr-2" @click.stop="dialog = true" @click="dialog2 = !true">Cancle</v-btn>
                    
              </v-card-text>
          </v-card>
        </v-dialog>
        <!-- ---------------------------------------------------- -->

       
        
    </v-container>
  </div>
</template>

<script>

export default {
    name:'Administration_index',
    data(){
      return{
        dialog: false,
        dialog2: false,
      
        User:[],
        
        Designations: ['Customer', 'Manager', 'Supervisor', 'CEO' , 'Salesman'],
        UserRoles:[]
        
      }
    },
    components: {
    
    },
    created(){
      this.$store.dispatch("GetUsers")
    },
    computed: {
       Users(){
       return this.$store.getters.ApplicationUsers
     }
    },
    methods:{
      GetUser:function(ApplicationUser_id){
        this.$store.dispatch("GetUser",ApplicationUser_id).then((res)=>{
          if(res != null){
            this.User = this.$store.getters.ApplicationUser
           }
        })
      },

      DeleteUser:function(ApplicationUser_id){
        this.$store.dispatch("DeleteUser",ApplicationUser_id)
        .then(res=>{
          if(res != null){
            this.$store.dispatch("GetUsers")
          }
        })
      },
      GetUserRoles(ApplicationUser_id){
        this.dialog = false
        this.$store.dispatch("GetUserRoles",ApplicationUser_id)
        .then(res =>{
          if(res != null){
            this.UserRoles = this.$store.getters.UserRoles
          }
        })
      },
      UpdateUserRoles(){
        var _userRoles = this.UserRoles
        this.$store.dispatch("UpdateUserRoles",_userRoles)
        .then(()=>{
          this.dialog = !false
          this.dialog2 = false
          this.$store.dispatch("GetRoleWithUsers")  
        })

      }
      
    }
}
</script>

<style>

</style>