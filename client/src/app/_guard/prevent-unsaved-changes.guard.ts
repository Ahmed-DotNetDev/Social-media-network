import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../memebers/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
  if (component.editForm?.dirty) {
    return confirm('Are you sure you want to continue ? any unsaved changes will lost!');
  }
  return true;
};
