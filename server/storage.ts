import { type UrlScan, type InsertUrlScan, type UrlReport, type InsertUrlReport } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // URL Scans
  createUrlScan(scan: InsertUrlScan): Promise<UrlScan>;
  getUrlScan(id: string): Promise<UrlScan | undefined>;
  getUrlScanByUrl(url: string): Promise<UrlScan | undefined>;
  getRecentScans(limit?: number): Promise<UrlScan[]>;
  
  // URL Reports
  createUrlReport(report: InsertUrlReport): Promise<UrlReport>;
  getReportsForScan(scanId: string): Promise<UrlReport[]>;
}

export class MemStorage implements IStorage {
  private urlScans: Map<string, UrlScan>;
  private urlReports: Map<string, UrlReport>;

  constructor() {
    this.urlScans = new Map();
    this.urlReports = new Map();
  }

  async createUrlScan(insertScan: InsertUrlScan): Promise<UrlScan> {
    const id = randomUUID();
    const scan: UrlScan = {
      ...insertScan,
      id,
      createdAt: new Date(),
      technicalDetails: insertScan.technicalDetails || null,
    };
    this.urlScans.set(id, scan);
    return scan;
  }

  async getUrlScan(id: string): Promise<UrlScan | undefined> {
    return this.urlScans.get(id);
  }

  async getUrlScanByUrl(url: string): Promise<UrlScan | undefined> {
    // Check for recent scan of the same URL (within last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return Array.from(this.urlScans.values()).find(
      (scan) => scan.normalizedUrl === url && scan.createdAt > oneHourAgo
    );
  }

  async getRecentScans(limit: number = 10): Promise<UrlScan[]> {
    return Array.from(this.urlScans.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async createUrlReport(insertReport: InsertUrlReport): Promise<UrlReport> {
    const id = randomUUID();
    const report: UrlReport = {
      ...insertReport,
      id,
      createdAt: new Date(),
      userVerdict: insertReport.userVerdict || null,
      notes: insertReport.notes || null,
      isHelpful: insertReport.isHelpful || null,
    };
    this.urlReports.set(id, report);
    return report;
  }

  async getReportsForScan(scanId: string): Promise<UrlReport[]> {
    return Array.from(this.urlReports.values()).filter(
      (report) => report.scanId === scanId
    );
  }
}

export const storage = new MemStorage();
