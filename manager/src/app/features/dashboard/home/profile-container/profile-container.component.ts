import { Component, Input } from '@angular/core';
import { IStudent } from '../../../../shared/interface';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrl: './profile-container.component.scss'
})
export class ProfileContainerComponent {
  @Input() student: IStudent | null = null
}
