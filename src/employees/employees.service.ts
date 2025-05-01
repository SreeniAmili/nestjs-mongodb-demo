import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel('Employee')
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const created = new this.employeeModel(createEmployeeDto);
    return created.save();
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findOne(id: string): Promise<Employee | null> {
    return this.employeeModel.findById(id).exec();
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee | null> {
    return this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, { new: true }).exec();
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.employeeModel.deleteOne({ _id: id }).exec();
    return { deleted: result.deletedCount === 1 };
  }
}
