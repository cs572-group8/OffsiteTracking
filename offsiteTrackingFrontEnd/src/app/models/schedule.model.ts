import { database } from 'firebase';

export interface ISchedule {
    empId: string;
    location:string;
    placeName:string;
    checkindate:string;
}
