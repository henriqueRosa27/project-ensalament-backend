import * as Yup from 'yup';
import { BuildingService } from 'src/building/building.service';
import { Repository } from 'typeorm';
import { BuildingEntity } from 'src/building/building.entity';

export const createUpdateBuildingValidation = Yup.object({
  name: Yup.string()
    .required('Campo obrigatório')
    .min(3, 'Mínimo de 3 caracteres')
    .max(50, 'Máximo de 50 caracteres'),
  building_id: Yup.number()
    .required('Campo obrigatório')
    .positive('Valor inválido')
    .test('building_exists', 'Prédio não existe', async value => {
      if (value) {
        const buildingService = new BuildingService(
          new Repository<BuildingEntity>(),
        );
        const building = await buildingService.findByIdActive(value);
        return !!building;
      }
      return true;
    }),
});
