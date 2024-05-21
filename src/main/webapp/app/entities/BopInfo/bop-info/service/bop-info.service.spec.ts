import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IBopInfo } from '../bop-info.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../bop-info.test-samples';

import { BopInfoService } from './bop-info.service';

const requireRestSample: IBopInfo = {
  ...sampleWithRequiredData,
};

describe('BopInfo Service', () => {
  let service: BopInfoService;
  let httpMock: HttpTestingController;
  let expectedResult: IBopInfo | IBopInfo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(BopInfoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a BopInfo', () => {
      const bopInfo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(bopInfo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of BopInfo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a BopInfo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addBopInfoToCollectionIfMissing', () => {
      it('should add a BopInfo to an empty array', () => {
        const bopInfo: IBopInfo = sampleWithRequiredData;
        expectedResult = service.addBopInfoToCollectionIfMissing([], bopInfo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(bopInfo);
      });

      it('should not add a BopInfo to an array that contains it', () => {
        const bopInfo: IBopInfo = sampleWithRequiredData;
        const bopInfoCollection: IBopInfo[] = [
          {
            ...bopInfo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBopInfoToCollectionIfMissing(bopInfoCollection, bopInfo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a BopInfo to an array that doesn't contain it", () => {
        const bopInfo: IBopInfo = sampleWithRequiredData;
        const bopInfoCollection: IBopInfo[] = [sampleWithPartialData];
        expectedResult = service.addBopInfoToCollectionIfMissing(bopInfoCollection, bopInfo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bopInfo);
      });

      it('should add only unique BopInfo to an array', () => {
        const bopInfoArray: IBopInfo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const bopInfoCollection: IBopInfo[] = [sampleWithRequiredData];
        expectedResult = service.addBopInfoToCollectionIfMissing(bopInfoCollection, ...bopInfoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const bopInfo: IBopInfo = sampleWithRequiredData;
        const bopInfo2: IBopInfo = sampleWithPartialData;
        expectedResult = service.addBopInfoToCollectionIfMissing([], bopInfo, bopInfo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bopInfo);
        expect(expectedResult).toContain(bopInfo2);
      });

      it('should accept null and undefined values', () => {
        const bopInfo: IBopInfo = sampleWithRequiredData;
        expectedResult = service.addBopInfoToCollectionIfMissing([], null, bopInfo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(bopInfo);
      });

      it('should return initial array if no BopInfo is added', () => {
        const bopInfoCollection: IBopInfo[] = [sampleWithRequiredData];
        expectedResult = service.addBopInfoToCollectionIfMissing(bopInfoCollection, undefined, null);
        expect(expectedResult).toEqual(bopInfoCollection);
      });
    });

    describe('compareBopInfo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBopInfo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareBopInfo(entity1, entity2);
        const compareResult2 = service.compareBopInfo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareBopInfo(entity1, entity2);
        const compareResult2 = service.compareBopInfo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareBopInfo(entity1, entity2);
        const compareResult2 = service.compareBopInfo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
