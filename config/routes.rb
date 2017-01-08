Rails.application.routes.draw do
  get 'residential/index'
  get 'residential/data', defaults: { format: 'json' }

  get 'residential/bar_chart'
  get 'residential/bar_data', defaults: { format: 'json' }

  root 'residential#index'
end
