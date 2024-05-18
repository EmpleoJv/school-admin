import { TestBed } from '@angular/core/testing';

import { TeacherLeaderbaordService } from './teacher-leaderbaord.service';

describe('TeacherLeaderbaordService', () => {
  let service: TeacherLeaderbaordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherLeaderbaordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
