export interface AppointmentFormData {
  name: string;
  phoneNumber: string;
  meetingTime: string;
  email: string;
  comment: string;
}

export interface Appointment extends AppointmentFormData {
  psychologist: string;
}
