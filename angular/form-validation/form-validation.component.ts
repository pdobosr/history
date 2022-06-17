import { Component, Input, Output, EventEmitter } from '@angular/core';

enum ERuleMatcher {
  EXISTS = 'EXISTS',
  IS = 'IS',
  IS_NOT = 'IS_NOT',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS',
  IN_RANGE = 'IN_RANGE',
  NOT_IN_RANGE = 'NOT_IN_RANGE'
}

interface ICondition {
  field: string;
  matcher: ERuleMatcher;
  value: string;
  values: {
    value: string
  }[];
  range: {
    from: string;
    to: string;
  };
}

export interface IValidation {
  name: string;
  description: string;
  conditions: ICondition[];
  message: string;
}

enum ViewMode {
  List,
  Detail
}

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss']
})
export class FormValidationComponent{
  @Input() validations: IValidation[];
  @Output() onChange = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<number>();
  @Output() onDuplicate = new EventEmitter<number>();

  private viewMode: ViewMode = ViewMode.List;
  private selectedValidationIndex: number | null = null;

  get isListView() {
    return this.viewMode === ViewMode.List;
  }

  get isDetailView() {
    return this.viewMode === ViewMode.Detail;
  }

  get hasEditBehavior() {
    return typeof this.selectedValidationIndex === 'number' && this.selectedValidationIndex >= 0;
  }

  get validation() {
    return this.hasEditBehavior ? this.validations[this.selectedValidationIndex] : null;
  }

  showList() {
    this.viewMode = ViewMode.List;
  }

  private showDetail() {
    this.viewMode = ViewMode.Detail;
  }

  addNewValidation() {
    this.selectedValidationIndex = null;
    this.showDetail();
  }

  handleEdit(index) {
    this.selectedValidationIndex = index;
    this.showDetail();
  }

  handleDelete(index) {
    this.onDelete.emit(index);
  }

  handleDuplicate(index) {
    this.onDuplicate.emit(index);
  }
}
