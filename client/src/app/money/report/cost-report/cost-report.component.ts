import { Component, OnInit } from "@angular/core";
import { CostService } from "src/app/service/money/cost.service";

@Component({
  selector: "app-cost-report",
  templateUrl: "./cost-report.component.html",
  styleUrls: ["./cost-report.component.css"]
})
export class CostReportComponent implements OnInit {
  dataSet = [];
  categoryList = [];
  loading = true;

  constructor(private moneyService: CostService) {}

  expandControl(dataItem: any) {
    console.log(" do I come here ? ", dataItem);
    this.dataSet.forEach((item, index) => {
      if (item._id !== dataItem._id) {
        this.dataSet[index].expand = false;
      } else {
        this.dataSet[index].expand = !this.dataSet[index].expand;
      }
    });
  }

  updateData(dataItem: any) {
    this.dataSet.forEach((item, index) => {
      if (item._id === dataItem._id) {
        // console.log(" com in a", dataItem, item);
        // this.dataSet[index].note = dataItem.note;
        // this.dataSet[index].costDate = moment(dataItem.costDate).format(
        //   "MM-DD-YYYY HH:mm"
        // );
        // this.dataSet[index].category = dataItem.category;
        // this.dataSet[index].subCategory = dataItem.subCategory;
        // this.dataSet[index].cost = dataItem.cost;

        this.dataSet = [
          ...this.dataSet.slice(0, index),
          dataItem,
          ...this.dataSet.slice(index + 1)
        ];
      }
    });

    console.log(this.dataSet);
  }

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.moneyService.costList().subscribe((result: any) => {
        console.log(result);
        this.loading = false;
        this.dataSet = result;
      });
      // should have a category table
      this.moneyService.categoryList().subscribe((result: any) => {
        this.categoryList = result;
      });
    }, 100);
  }
}