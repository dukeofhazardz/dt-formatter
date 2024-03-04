"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../lib/helper");
describe('padZero', () => {
    it('should return "01" for value 1', () => {
        expect((0, helper_1.padZero)(1)).toBe('01');
    });
    it('should return "10" for value 10', () => {
        expect((0, helper_1.padZero)(10)).toBe('10');
    });
    it('should return "23" for value 23', () => {
        expect((0, helper_1.padZero)(23)).toBe('23');
    });
    it('should return "00" for value 0', () => {
        expect((0, helper_1.padZero)(0)).toBe('00');
    });
});
describe('getYear', () => {
    it('should return 21 for year 2021', () => {
        expect((0, helper_1.getYear)(2021)).toBe(21);
    });
    it('should return 95 for year 1995', () => {
        expect((0, helper_1.getYear)(1995)).toBe(95);
    });
    it('should return 10 for year 2010', () => {
        expect((0, helper_1.getYear)(2010)).toBe(10);
    });
    it('should return 0 for year 2000', () => {
        expect((0, helper_1.getYear)(2000)).toBe(0);
    });
});
