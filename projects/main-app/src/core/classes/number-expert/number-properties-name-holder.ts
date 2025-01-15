import * as uiDefault from '../../../assets/languages/core/classes/number-expert/lang/1/en-US.json';
import { ILocalizationClient, ILocalizer, LocalizerFactory } from '@vsirotin/localizer';
export class NumberPropertiesNameHolder implements ILocalizationClient<INumberPropertiesNameHolder> {

  localizer: ILocalizer;

  data : INumberPropertiesNameHolder = (uiDefault as any).default;

  constructor() {
      this.localizer = LocalizerFactory.createLocalizer<INumberPropertiesNameHolder>("assets/languages/core/classes/number-expert/lang", 1, this.data, this);
  }
  
  updateLocalization(data: INumberPropertiesNameHolder): void {
    this.data = data;
  }

  getCriteriaPrefix(): string {
    return this.data.criteriaPrefix;
  }
  getCriteriaIndexedList(): ISearchEntry[] {
    return this.data.criteriaIndexedList;
  }

}


export interface ISearchEntry {
  id: number;
  criteria: string;
}

interface INumberPropertiesNameHolder {
  criteriaPrefix: string;
  criteriaIndexedList: ISearchEntry[];
}

